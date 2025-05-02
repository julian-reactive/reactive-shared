import React, { ReactElement, useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'

import Box from '@mui/material/Box'
import CheckIcon from '@mui/icons-material/Check'

import { Loading } from '../../components'

type InfiniteScrollProps = {
  page: number
  onNext: () => void
  items: ReactElement[]
}

const PAGE_SIZE = 15

const IScroll: React.FC<InfiniteScrollProps> = ({ page, onNext, items }) => {
  const [allItems, setAllItems] = React.useState<ReactElement[]>(items)

  useEffect(() => {
    if (page === 1) {
      setAllItems(items)
    } else {
      setAllItems((prevItems) => [...prevItems, ...items])
    }
  }, [items, page])

  return (
  <InfiniteScroll
    dataLength={items.length}
    next={onNext}
    hasMore={items.length === PAGE_SIZE}
    loader={<Loading />}
    endMessage={
     <Box sx={{ display: 'flex', justifyContent: 'center' }}><CheckIcon color="success" sx={{ fontSize: 40 }}/></Box>
    }
  >
    {allItems}
  </InfiniteScroll>
  )
}

export default IScroll
