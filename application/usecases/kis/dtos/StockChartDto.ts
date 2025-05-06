export interface StockChartDto {
    stckBsopDate: string;       // 주식 기준일자 (yyyyMMdd)
    stckCntgHour?: string;      // 체결 시간 (HHmmss, 1분봉 차트에만 존재)
    stckOprc: string;           // 시가 (Open Price)
    stckHgpr: string;           // 고가 (High Price)
    stckLwpr: string;           // 저가 (Low Price)
    stckClpr?: string;          // 종가 (Close Price, 일/주/월/년 봉에서 사용)
    stckPrpr?: string;          // 현재가 (Present Price, 1분봉에서 사용)
  }
  