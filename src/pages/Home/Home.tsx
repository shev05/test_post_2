import { useState } from 'react'
import { Footer } from './ElementsHome/Footer'
import { GlobalHeader } from './ElementsHome/Header'
import { Main } from './ElementsHome/Main'
import type { IPostFilter } from '../../shared/constants/types/post'

export default function Home() {
  const [filter, setFilter] = useState<IPostFilter>({})

  return (
    <div className="flex min-h-screen flex-col pb-10">
      <GlobalHeader onFilterChange={setFilter} />
      <Main filter={filter} />
      <Footer />
    </div>
  )
}
