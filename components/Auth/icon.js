
import iconEOS from '@/assets/img/icon_logo_eos.svg'
import iconTokenpocket from '@/assets/img/icon_tokenpocket.svg'
import iconMathwallet from '@/assets/img/icon_mathwallet.svg'
import iconScatter from '@/assets/img/icon_scatter.svg'
import iconONT from '@/assets/img/icon_logo_ont.svg'
import iconCyano from '@/assets/img/icon_cyano.svg'
import iconLeafwallet from '@/assets/img/icon_leafwallet.svg'
import iconChallte from '@/assets/img/icon_challte.svg'
import iconMeet from '@/assets/img/icon_meet.svg'
import iconOnto from '@/assets/img/icon_logo_onto.svg'
import iconImtoken from '@/assets/img/icon_logo_imtoken.svg'

export const wallet = {
  eos: [
    {
      url: iconTokenpocket,
      href: 'https://www.tokenpocket.pro/',
      alt: 'https://www.tokenpocket.pro/'
    },
    {
      url: iconScatter,
      href: 'https://get-scatter.com/',
      alt: 'https://get-scatter.com/'
    },
    {
      url: iconChallte,
      href: 'http://eblock.io/',
      alt: 'http://eblock.io/'
    },
    {
      url: iconMathwallet,
      href: 'http://mathwallet.net/',
      alt: 'http://mathwallet.net/'
    },
    {
      url: iconLeafwallet,
      href: 'https://www.leafwallet.io/',
      alt: 'https://www.leafwallet.io/'
    },
    {
      url: iconMeet,
      href: 'https://meet.one/',
      alt: 'https://meet.one/'
    },
    {
      url: iconImtoken,
      href: 'https://token.im/download',
      alt: 'https://token.im/download'
    }
  ],
  ont: [
    {
      url: iconOnto,
      href: 'https://onto.app/',
      alt: 'https://onto.app/'
    },
    {
      url: iconCyano,
      href:
        'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm',
      alt:
        'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm'
    },
    {
      url: iconMathwallet,
      href: 'http://mathwallet.net/',
      alt: 'http://mathwallet.net/'
    }
  ]
}

export const idProvider = [
  {
    url: iconEOS,
    title: 'EOS登录',
    type: 'EOS',
    wallet: [
      {
        url: iconTokenpocket,
        href: 'https://www.tokenpocket.pro/',
        alt: 'https://www.tokenpocket.pro/'
      },
      {
        url: iconScatter,
        href: 'https://get-scatter.com/',
        alt: 'https://get-scatter.com/'
      },
      {
        url: iconChallte,
        href: 'http://eblock.io/',
        alt: 'http://eblock.io/'
      },
      {
        url: iconMathwallet,
        href: 'http://mathwallet.net/',
        alt: 'http://mathwallet.net/'
      },
      {
        url: iconLeafwallet,
        href: 'https://www.leafwallet.io/',
        alt: 'https://www.leafwallet.io/'
      },
      {
        url: iconMeet,
        href: 'https://meet.one/',
        alt: 'https://meet.one/'
      },
      {
        url: iconImtoken,
        href: 'https://token.im/download',
        alt: 'https://token.im/download'
      }
    ],
    doc: {
      title: '《如何使用EOS登录》',
      href: 'https://www.matataki.cn/p/515'
    }
  },
  {
    url: iconONT,
    title: 'ONT登录',
    type: 'ONT',
    wallet: [
      {
        url: iconOnto,
        href: 'https://onto.app/',
        alt: 'https://onto.app/'
      },
      {
        url: iconCyano,
        href:
          'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm',
        alt:
          'https://chrome.google.com/webstore/detail/cyano-wallet/dkdedlpgdmmkkfjabffeganieamfklkm'
      },
      {
        url: iconMathwallet,
        href: 'http://mathwallet.net/',
        alt: 'http://mathwallet.net/'
      }
    ],
    doc: {
      title: '《如何使用ONT登录》',
      href: 'https://www.matataki.cn/p/516'
    }
  }
]
