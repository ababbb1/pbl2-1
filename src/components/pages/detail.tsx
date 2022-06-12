import { useSetPage } from '../../hooks'
import { PostCard } from '../../components'

export default function Detail() {
  useSetPage('detail')
  return <PostCard />
}
