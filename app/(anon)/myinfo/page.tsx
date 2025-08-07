"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Container, MyBox, LoginBox, Button,
} from "@/app/(anon)/myinfo/components/page.styled";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import '@/app/components/styles/swal-custom.css';

const MyInfo = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState<{
    name: string;
    loginId: string;
  } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/myinfo", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (response.status === 401) {
          setIsLoggedIn(false);
          setUserData(null);
          return;
        }

        const data = await response.json();
        setIsLoggedIn(true);
        setUserData(data);
      } catch (error) {
        console.error("Error server", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/logout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    Swal.fire({
      title: "로그아웃 하였습니다!",
      icon: "success",
      confirmButtonText: "확인",
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button',
        icon: 'swal-icon-custom'
      },
      width: '90%'
    });

    router.push("/");
  };

  const handleDeleteId = async () => {
    await fetch("/api/delete-user", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });

    Swal.fire({
      title: "회원탈퇴 하였습니다!",
      icon: "success",
      confirmButtonText: "확인",
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        confirmButton: 'swal-confirm-button',
        icon: 'swal-icon-custom'
      },
      width: '90%'
    });

    router.push("/");
  };

  // SweetAlert로 확인 모달 열기
  const handleActionWithConfirm = (type: "logout" | "delete") => {
    const isLogout = type === "logout";

    Swal.fire({
      title: isLogout ? "로그아웃 하시겠습니까?" : "정말로 탈퇴하시겠습니까?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "확인",
      cancelButtonText: "취소",
      confirmButtonColor: "var(--primary-color)",
      cancelButtonColor: "var(--second-color)",
      customClass: {
        title: 'swal-title-custom',
        popup: 'swal-popup-custom',
        icon: 'swal-icon-custom',
        confirmButton: 'swal-confirm-button-custom',
        cancelButton: 'swal-cancel-button-custom',  
      },
      width: '90%'
    }).then((result) => {
      if (result.isConfirmed) {
        if (type === "logout") {
          handleLogout();
        } else {
          handleDeleteId();
        }
      }
    });
  };

  return (
    <Container>
      <MyBox>
        <Image
          src="/user_profile.png"
          alt="user_profile"
          width={100}
          height={100}
          priority
        />
        {isLoggedIn ? (
          <>
            <div>{userData?.name}님</div>
            <div style={{ paddingRight: "45px" }}></div>
          </>
        ) : (
          <span>로그인이 필요합니다</span>
        )}
      </MyBox>

      {isLoggedIn ? (
        <LoginBox>
          <Button onClick={() => handleActionWithConfirm("logout")}>로그아웃</Button>
          <Button onClick={() => handleActionWithConfirm("delete")}>회원탈퇴</Button>
        </LoginBox>
      ) : (
        <LoginBox>
          <Button onClick={() => router.push("/login")}>로그인</Button>
          <Button onClick={() => router.push("/signup")}>회원가입</Button>
        </LoginBox>
      )}
    </Container>
  );
};

export default MyInfo;
