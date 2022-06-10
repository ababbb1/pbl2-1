import { Children, ReactComponentElement, ReactNode } from 'react'

interface IconProps {
  children: JSX.Element
  text: string
  textStyle: string
}

export default function Icon({ children, text, textStyle = 'text-sm text-theme1' }: IconProps) {
  return (
    <div className='flex flex-col gap-1'>
      <div>{children}</div>
      {text ? <span className={textStyle}>{text}</span> : null}
    </div>
  )
}
