export default function ErrorMessage({ message }: { message: string | undefined }) {
  if (!message) return null
  else return <span className='text-red-400 text-sm px-1'>{message}</span>
}
