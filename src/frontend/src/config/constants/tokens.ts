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
      TEST: '0xAd812C3dfA81A6687566c3aa822f1946Ec2EfD8a',
    },
    decimals: 18,
  },
}

export default tokens