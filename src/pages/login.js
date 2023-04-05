import { signIn, signOut, useSession } from 'next-auth/react'
import { Button } from '@mui/material'
import { Text } from '@chakra-ui/react'
import List from '@mui/material'
import { Code } from '@chakra-ui/react'
import Link from '@mui/material'

export default function Home() {
  const { data, status } = useSession()

  return (
 
     <>
      <section className="flex flex-col gap-6">
        <Text variant="h1">Securing routes using next-auth</Text>
        <Text>
          Wrapping our <Code>pages/_app</Code> using{' '}
          <Code>SessionProvider</Code> from <Code>next-auth</Code> will secure
          all our pages. If we configure sub domains or rewrites, all will be
          behind an auth wall.
        </Text>
      </section>

      

      <section className="flex flex-col gap-3">
        {status === 'authenticated' ? (
          <section className="flex flex-col gap-3">
            Welcome {data?.user?.name}!{' '}
            <Button onClick={() => signOut('google')}>Sign out</Button>
            <List>
              <li>
                <Link href="https://subdomain.solutions-subdomain-auth.vercel.sh">
                  subdomain.solutions-subdomain-auth.vercel.sh
                </Link>
              </li>
              <li>
                <Link href="https://solutions-subdomain-auth.vercel.sh">
                  solutions-subdomain-auth.vercel.sh
                </Link>
              </li>
            </List>
          </section>
        ) : status === 'loading' ? (
          <section className="text-center">
            <Text>Loading...</Text>
          </section>
        ) : (
          <section className="m-auto w-fit">
            <Button size="lg" onClick={() => signIn('google')}>
              Sign in with GitHub
            </Button>
          </section>
        )}
      </section>
     
     </>
   
  )
}

