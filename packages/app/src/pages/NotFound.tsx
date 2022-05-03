import Error404 from '../svg/404-error.svg?component'

import 'twin.macro'
import { SvgIcon } from '../components/CompStore'

const NotFoundPage = () => {
  return (
    <div tw="w-full mt-4 text-purple-900">
      <div tw="text-center margin-top[15%]">
        <SvgIcon tw="font-size[6em] mb-3 text-purple-700">
          <Error404 />
        </SvgIcon>
        <h2 tw="font-normal mb-0">Page Not Found</h2>
        <p tw="text-sm">The page you requested does not exist.</p>
      </div>
    </div>
  )
}

export default NotFoundPage
