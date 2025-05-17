import nodemailer from "nodemailer";
import crypto from "crypto";
import { promisify } from "util";
import { IUserRepository } from "@/domain/repositories/IUserRepository";
import redisClient from "@/infrastructure/redis/redisClient";
import { env } from "@/config/env";

const setAsync = promisify(redisClient.set).bind(redisClient);
const expireAsync = promisify(redisClient.expire).bind(redisClient);

export class SendEmailAuthCodeUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(email: string): Promise<void> {
    // 중복 이메일 체크
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("중복된 이메일입니다!");
    }

    // 인증번호 생성 (6자리 랜덤 숫자)
    const authCode = crypto.randomInt(100000, 999999).toString();
    const dataToStore = JSON.stringify({ email, authCode });

    // Redis에 저장 (5분간 유효)
    await setAsync(`emailAuth:${email}`, dataToStore);
    await expireAsync(`emailAuth:${email}`, 300);

    // nodemailer 설정
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: env.SMTP_EMAIL_USER,
        pass: env.SMTP_EMAIL_PASSWORD,
      },
    });

    // 이메일 전송 옵션
    // const mailOptions = {
    //   from: env.SMTP_EMAIL_USER,
    //   to: email,
    //   subject: "Mufin 이메일 인증번호",
    //   html: `
    //     <h1 style="color:#5865f2;">Mufin</h1>
    //     <p>안녕하세요 머핀입니다! 이메일 인증을 위한 인증번호입니다.</p>
    //     <h2 style="color:blue;">🔢 ${authCode}</h2>
    //     <p>이 인증번호는 <b>5분</b> 동안 유효합니다.</p>
    //   `,
    // };
    const mailOptions = {
      from: env.SMTP_EMAIL_USER,
      to: email,
      subject: "Mufin 회원가입 이메일 인증번호",
      html: `
        <div style="max-width: 480px; margin: 0 auto; font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; border: 1px solid #e0e0e0; border-radius: 10px; padding: 30px 20px; background-color: #ffffff; box-shadow: 0 4px 8px rgba(0,0,0,0.05);">
          <div style="text-align: center;">
            <h1 style="color: #5865f2; margin-bottom: 8px;">Mufin</h1>
            <p style="font-size: 16px; color: #333;">안녕하세요, <strong>Mufin</strong>입니다!<br/>이메일 인증을 위한 인증번호를 보내드립니다.</p>
          </div>
          <div style="margin: 30px 0; text-align: center;">
            <p style="font-size: 15px; color: #555; margin-bottom: 8px;">아래 인증번호를 입력해주세요.</p>
            <div style="display: inline-block; padding: 16px 32px; font-size: 24px; color: #fff; background-color: #5865f2; border-radius: 8px; font-weight: bold; letter-spacing: 3px;">
              ${authCode}
            </div>
            <p style="margin-top: 16px; font-size: 14px; color: #999;">이 인증번호는 <strong>5분</strong> 동안 유효합니다.</p>
          </div>
          <div style="border-top: 1px solid #eee; padding-top: 16px; font-size: 12px; color: #aaa; text-align: center;">
            본 메일은 발신 전용입니다. 문의는 boyun0802@gmail.com으로 연락해주세요.
          </div>
        </div>
      `,
    };
    

    // 이메일 전송
    await transporter.sendMail(mailOptions);
  }
}
