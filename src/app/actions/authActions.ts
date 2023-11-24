'use server'
import { signIn, signOut } from '../../../auth'

export async function signInUser() {
  await signIn('github')
}
export async function signOutUser() {
  console.log('signing out')
  await signOut()
}
