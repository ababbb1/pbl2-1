import { usePage } from '../../hooks'
import PostCard from '../layouts/postCard'

export default function Detail() {
  usePage('detail')
  return <PostCard />
}
