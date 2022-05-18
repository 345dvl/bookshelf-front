import { Alert, Button, InputLabel, Snackbar, TextField } from "@mui/material"
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth"
import { NextPage } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthContext } from "../lib/AuthContext"
import { app } from "../lib/firebase"



const Signup: NextPage = () => {
  const router = useRouter()
  const auth = getAuth(app)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { user } = useAuthContext()
  const isLoggedIn = !!user

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await createUserWithEmailAndPassword(auth, email, password)
    router.push("/")
  }
  const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value)
  }
  const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value)
  }
  const handleLogout = async () => {
    await signOut(auth)
    await router.push("/")
  }

  return (
    <>
      <Snackbar
        open={!isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">ログインしてください</Alert>
      </Snackbar>
      <Snackbar
        open={isLoggedIn}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        key={"top" + "center"}
      >
        <Alert severity="warning">
          既にログインしています
        </Alert>
      </Snackbar>
      <h1>
        新規登録
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <InputLabel>メールアドレス</InputLabel>
          <TextField
            name="email"
            type="email"
            size="small"
            onChange={handleChangeEmail}
          />
        </div>
        <div>
          <InputLabel>パスワード</InputLabel>
          <TextField
            name="password"
            type="password"
            size="small"
            onChange={handleChangePassword}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined">
            登録
          </Button>
        </div>
      </form>
      <div>
        <Link href={"/signin"}>
          <a>ログインはこちら</a>
        </Link>
      </div>
      <div>
        <Link href={"/"}>
          <a>トップに戻る</a>
        </Link>
      </div>
      <div>
        {isLoggedIn && <Button type="submit" variant="outlined" onClick={handleLogout}>
          ログアウト
        </Button>}
      </div>
    </>
  )
}

export default Signup
