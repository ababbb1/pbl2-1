import { cls } from '../../functions/utils'

interface ButtonProps {
  text: string
  type?: 'button' | 'submit' | 'reset'
  style: string
  onClick?: any
}

export default function Button({ text, type, style, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`${cls('w-full rounded-md select-none', style)}`}
    >
      {text}
    </button>
  )
}
