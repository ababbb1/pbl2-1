import { useSetPage } from '../../hooks'
import { FloatingButton, PostCard } from '../../components'
import { PencilIcon } from '@heroicons/react/outline'
import InfiniteScroll from 'react-infinite-scroller'
// import { getPostsRequest } from '../../functions/requests'
import { useCallback, useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import parseLinkHeader from 'parse-link-header'

export default function PostList() {
  useSetPage('home')
  // const [items, setItems] = useState([])

  // useEffect(() => {
  //   getPostsRequest((res: AxiosResponse) => {
  //     console.log(res)
  //     setItems(res.data.slice(0, 10))
  //   })()
  // }, [])

  // const fetchData = () => {
  //   getPostsRequest((res: AxiosResponse) => {
  //     setItems(res.data.slice(0, 10))
  //   })
  // }

  // const loader = (
  //   <div key="loader" className="loader">
  //     Loading ...
  //   </div>
  // );

  return (
    <div className='w-full bg-gray-200 min-h-screen flex justify-center pb-16'>
    {/* //   <div>
    //   <InfiniteScroll
    //   loadMore={() => getPostsRequest((res: AxiosResponse) => {
    //     console.log(res.data)
    //     setItems(res.data.slice(0, 10))
    //   })()}
    //   hasMore={true}
    //   loader={loader}
    // >
    //   <ul>
    //     {items.map((item: any, i: number) => (
    //       <div key={i}>{item.content}</div>
    //     ))}
    //   </ul>
    // </InfiniteScroll>
    //   </div> */}

      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </div>
  )
}
