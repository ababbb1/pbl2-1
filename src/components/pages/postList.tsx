import { useSetPage } from '../../hooks'
import { PencilIcon } from '@heroicons/react/outline'
import { useEffect } from 'react'
import PostCard from '../layouts/postCard'
import FloatingButton from '../assets/floatingButton'
import { fetchList } from '../../functions/requests'
import { getPostList } from '../../store/reducer'
import { useAppDispatch, useAppSelector } from '../../store/configStore'
import InfiniteLoader from 'react-window-infinite-loader'
import { FixedSizeList } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'
import { Route, Routes, useLocation } from 'react-router-dom'
import Redirect from '../route/redirect'
import PostCardModal from '../layouts/postCardModal'

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

  const dispatch = useAppDispatch()
  const list = useAppSelector(getPostList)

  useEffect(() => {
    fetchList(dispatch)
  }, [])

  const Row = ({ index, style }: { index: number; style: any; data: any }) => {
    return (
      <div
        className='ListItem'
        style={{
          ...style,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <PostCard item={list[index]} isModal={false} />
      </div>
    )
  }

  return (
    <div className='w-full bg-gray-200 min-h-screen flex justify-center'>
      <div className='w-full'>
        <AutoSizer>
          {({ height, width }) => (
            <InfiniteLoader
              isItemLoaded={isItemLoaded}
              itemCount={list?.length}
              loadMoreItems={loadMoreItems}
            >
              {({ onItemsRendered, ref }) => (
                <FixedSizeList
                  className='List'
                  height={height}
                  itemCount={list?.length}
                  itemSize={460}
                  onItemsRendered={onItemsRendered}
                  ref={ref}
                  width={width}
                >
                  {Row}
                </FixedSizeList>
              )}
            </InfiniteLoader>
          )}
        </AutoSizer>
      </div>
      <FloatingButton path={'/posting'}>
        <PencilIcon className='text-white w-6 h-6' />
      </FloatingButton>
    </div>
  )
}
