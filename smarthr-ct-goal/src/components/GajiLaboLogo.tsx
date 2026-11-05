import logoSvg from '../assets/gaji-labo-logo.svg?raw'

import './logo.css'

/** Gaji-Labo のロゴ（currentColor で塗られる SVG）。Header の上では白で表示する。 */
export const GajiLaboLogo = ({ tone = 'white' }: { tone?: 'white' | 'black' }) => (
  <span
    className="ct-logo"
    data-tone={tone}
    role="img"
    aria-label="Gaji-Labo（新しいタブで開きます）"
    // eslint-disable-next-line react/no-danger -- 固定のロゴ SVG（brief/gaji-labo-logo.svg）を埋め込むため
    dangerouslySetInnerHTML={{ __html: logoSvg.replace(/<metadata>[\s\S]*?<\/metadata>/, '') }}
  />
)
