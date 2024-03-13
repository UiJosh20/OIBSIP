

const ConfirmEmail = () => {
  const verifyUrl = "http://localhost:3000/user/verify/:verificationToken"
  

  axios.get(verifyUrl).then((res) => {
    console.log(res.data);
  }
  return (
    <>
    <section className="bg-black border-t-2 border-green-300 h-screen flex justify-center items-center ">
        <main className="border w-96 border-green-500 rounded-md text-white p-7 ">
          <p className="text-xl">A confirmation mail has been sent to your email. Please kindly click the link in the mail to proceed</p>
        </main>
    </section>
    </>
  )
}

export default ConfirmEmail