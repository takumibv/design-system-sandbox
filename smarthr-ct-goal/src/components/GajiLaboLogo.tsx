import logoSvg from '../assets/gaji-labo-logo.svg?raw'

import './logo.css'

/** Gaji-Laboのロゴ（currentColorで塗られるSVG）。Headerの上では白で表示する。 */
export const GajiLaboLogo = ({ tone = 'white' }: { tone?: 'white' | 'black' }) => (
  <span
    className="ct-logo"
    data-tone={tone}
    role="img"
    aria-label="Gaji-Labo（新しいタブで開きます）"
     
    dangerouslySetInnerHTML={{ __html: logoSvg.replace(/<metadata>[\s\S]*?<\/metadata>/, '') }}
  />
)
