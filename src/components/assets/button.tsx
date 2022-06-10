import { cls } from '../../functions'

interface ButtonProps {
  text: string
  type: 'button' | 'submit' | 'reset' | undefined
  style: string
}

export default function Button({ text, type, style }: ButtonProps) {
  return (
    <button type={type} className={`${cls('w-full rounded-md select-none', style)}`}>
      {text}
    </button>
  )
}
