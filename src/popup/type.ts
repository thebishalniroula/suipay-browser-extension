import { PageName } from './App'

type PageProps = {
  page: PageName
  setPage: (page: PageName) => void
}
export type PageComponent = (props: PageProps) => JSX.Element
