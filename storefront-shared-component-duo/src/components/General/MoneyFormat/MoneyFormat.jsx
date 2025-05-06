import React from 'react'
import { formatMoney } from '../formatMoney'

export const MoneyFormat = ({ price }) => {
  const negativeOrNot = parseFloat(price) < 0 ? true : false
  const htmlData = negativeOrNot ? formatMoney(
    price * 100,
    window?.flitsThemeAppExtensionObjects?.money_format
  ) : formatMoney(
    Math.abs(price * 100),
    window?.flitsThemeAppExtensionObjects?.money_format
  )
  return (
    <i style={{fontStyle: "normal"}} dangerouslySetInnerHTML={{__html: htmlData}}></i>
  )
}
