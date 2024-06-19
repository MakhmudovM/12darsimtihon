import { useRouteError, Link } from "react-router-dom"


function Error() {
  const error = useRouteError();
  console.log(error);

  if(error.status == "404") {
    return (
      <main className="min-h-screen grid place-content-center text-neutral">
        <div className="text-center">
          <h2 className="text-primary text-4xl lg:text-8xl mb-3">404</h2>
          <p className="font-bold mb-5 text-3xl lg:text-6xl">Page Not Found</p>
          <Link className="btn btn-sm lg:btn-md btn-primary" to={"/"}>Back home</Link>
        </div>
      </main>
    )
  }

  return(
    <main className="min-h-screen grid place-content-center text-neutral">
        <div className="text-center">
          <h2 className="text-primary text-4xl lg:text-8xl mb-3">Upps...!</h2>
          <p className="font-bold mb-5 text-3xl lg:text-6xl">Something went wrong</p>
          <Link className="btn btn-sm lg:btn-md btn-primary" to={"/"}>Back home</Link>
        </div>
      </main>
  )
 
}

export default Error