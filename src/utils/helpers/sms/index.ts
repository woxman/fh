import axios from 'axios'

import config from "../../config"

const { smsApiKey } = config

export const sendCode = async (phone: string, code: number) => {
  try {
    //const message = `کد تایید شما: ${code}`
    //const url = `https://api.kavenegar.com/v1/${smsApiKey}/sms/send.json`
    /*const options = {
      params: {
        receptor: phone,
        message,
        sender: '2000044459563'
      }
    }*/
    const message = `${code}`
    const url = `https://api.kavenegar.com/v1/${smsApiKey}/verify/lookup.json`    
    const options = {
      params: {
        receptor: phone,
        token:message
      }
    }
    console.log(options)

    await axios.post(url, {}, options)
  } catch(error) {
    console.log("*************Eror sms**************")
    console.log(error)
    console.log("*************Eror sms**************")
    throw error
  }
}