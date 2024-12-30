import { JSDOM } from 'jsdom'
import * as DOMPurify from 'dompurify'
import { Transform } from 'class-transformer'

export const HtmlPurify = () => {
  const window = new JSDOM('').window
  const purify = DOMPurify(window)
  return Transform(({ value }) => {
    return purify.sanitize(value)
  })
}
