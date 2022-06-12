import { useSetPage } from '../../hooks'
import PostCard from '../layouts/postCard'

export default function Detail() {
  useSetPage('detail')
  return <PostCard />
}
