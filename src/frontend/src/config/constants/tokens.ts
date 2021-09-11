interface Wrapper {
    symbol: string
    address: {
      MAIN: string
      TEST: string
    }
    decimals: number
}

interface TOKENS {
  cake: Wrapper
}

const tokens: TOKENS = {
  cake: {
    symbol: 'CAKE',
    address: {
      MAIN: '0x0000000000000000000000000000000000000000',
      TEST: '0x0D222855592334C56C0CB33851E6821a8792C91F',
    },
    decimals: 18,
  },
}

export default tokens