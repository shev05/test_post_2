import { useState } from 'react'
import { useGetPostQuery } from '../../services/api/post/postEndpoints'
import { useUserQuery } from '../../services/api/user/userEndpoints'
import { Footer } from './ElementsHome/Footer'
import { GlobalHeader } from './ElementsHome/Header'
import { Main } from './ElementsHome/Main'
import type { IPostFilter } from '../../shared/constants/types/post'

export default function Home() {
  const [filter, setFilter] = useState<IPostFilter>({})

  const { data: users } = useUserQuery()
  const { data: posts } = useGetPostQuery(filter)
  return (
    <div className="flex min-h-screen flex-col pb-10">
      <GlobalHeader
        users={users}
        onFilterChange={setFilter}
      />
      <Main posts={posts} />
      <Footer />
    </div>
  )
}
