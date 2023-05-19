import axios from 'axios'

import config from "../../config"

const { smsApiKey } = config

export const sendCode = async (phone: string, code: number) => {
  try {
    const message = `کد تایید شما: ${code}`
    const url = `https://api.kavenegar.com/v1/${smsApiKey}/sms/send.json`
    const options = {
      params: {
        receptor: phone,
        message,
        sender: '2000044459563'
      }
    }

    await axios.post(url, {}, options)
  } catch(error) {
    throw error
  }
}