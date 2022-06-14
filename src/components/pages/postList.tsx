import { useSetPage } from '../../hooks'
import { FloatingButton, PostCard } from '../../components'
import { PencilIcon } from '@heroicons/react/outline'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { useEffect, useState } from 'react'
import { AxiosResponse } from 'axios'
import { getPostsRequest } from '../../functions'

const LOADING = 1
const LOADED = 2
const itemStatusMap: { [k: number]: any } = {}

const isItemLoaded = (index: number) => !!itemStatusMap[index]
const loadMoreItems = (startIndex: number, stopIndex: number) => {
  for (let index = startIndex; index <= stopIndex; index++) {
    itemStatusMap[index] = LOADED
  }
}

export default function PostList() {
  useSetPage('home')
  const [list, setList] = useState([])

  useEffect(() => {
    console.log('rendered')
    getPostsRequest((res: AxiosResponse) => {
      console.log(res)
      setList(res.data.post_list)
    })()
  }, [])

  useEffect(() => {
    console.log(list)
  }, [list])

  const Row = ({ index, style }: { index: number; style: any; data: any }) => {
    return (
      <div
        className='ListItem'
        style={{
          ...style,
        }}
      >
        <PostCard item={list[index]} />
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-200 min-h-screen flex justify-center'>
      <div className='w-full max-w-md'>
        <InfiniteLoader
          isItemLoaded={isItemLoaded}
          itemCount={list.length}
          loadMoreItems={loadMoreItems}
        >
          {({ onItemsRendered, ref }) => (
            <FixedSizeList
              className='List'
              height={10000}
              itemCount={list.length}
              itemSize={500}
              onItemsRendered={onItemsRendered}
              ref={ref}
              width={'100%'}
            >
              {Row}
            </FixedSizeList>
          )}
        </InfiniteLoader>
      </div>

      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </div>
  )
}
