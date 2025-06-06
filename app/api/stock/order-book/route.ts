
import { kisAPIDi } from "@/infrastructure/config/kisApiDi";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {

    const queryParams = new URL(req.url).searchParams;
    const symbol = queryParams.get('symbol') || '';


    const data = await kisAPIDi.getOrderBookUseCase.execute(symbol);  

    return  NextResponse.json(data, { status: 200 });

  } catch (error: unknown) {
    console.error('API 요청 실패:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return  NextResponse.json({ message: '데이터 가져오기 실패', error: errorMessage }, { status: 500 });
  }
}