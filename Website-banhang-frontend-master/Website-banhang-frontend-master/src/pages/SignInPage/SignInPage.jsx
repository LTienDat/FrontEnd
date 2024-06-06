import React from 'react'
import { WrapperContainer, WrapperTextLight } from './style'
import InputForm from '../../components/InputForm/InputForm'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import { EyeFilled, EyeInvisibleFilled } from '@ant-design/icons'
import { useState } from 'react'
const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false)
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.53)', height: '100vh'}}>
      <div style={{ width: '360px', height: '350px', borderRadius: '6px', background: '#fff'}}>
        <WrapperContainer>
          <h1>Xin chào</h1>
          <p>Đăng nhập hoặc tạo tài khoản</p>
          <InputForm placeholder="abc@gmail.com"/>
          <div style={{ position: 'relative'}}>
          <InputForm placeholder="password" type={isShowPassword ? 'text' : 'password'}/>
            <span style={{zIndex: 10, positon: 'absolute', top: '4px', right: '8px', marginLeft: '5px'}}>
              {isShowPassword ? (
                <EyeFilled/>
              ):(
                <EyeInvisibleFilled/>
              )
              }
            </span>
          </div>
          <ButtonComponent
              size={40} 
              styleButton={{ background: 'rgb(255, 57, 69)', width: '300px', height: '45px', border: 'none', borderRadius: '4px'}} 
              textButton={'Đăng nhập'}
              styleTextButton = {{ color: '#fff', fontSize: '15px', fontWeight: '7000'}}
          >
          </ButtonComponent>
          <div style={{marginTop: '10px'}}><WrapperTextLight>Quên mật khẩu?</WrapperTextLight></div>
          <p>Chưa có tài khoản? <WrapperTextLight>Tạo tài khoản</WrapperTextLight></p>
        </WrapperContainer>

      </div>
    </div>
  )
}

export default SignInPage