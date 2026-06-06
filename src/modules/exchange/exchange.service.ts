import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async getExchangeRate() {
    const response = await fetch(
      'https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,GBP-BRL,JPY-BRL,CHF-BRL,BTC-BRL',
    );
    const data = await response.json();

    return {
      Dolar: data.USDBRL.bid,
      Euro: data.EURBRL.bid,
      Libra : data.GBPBRL.bid,
      Iene: data.JPYBRL.bid,
      FrancoSuico: data.CHFBRL.bid,
    };
  }
}