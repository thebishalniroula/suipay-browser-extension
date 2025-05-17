import toast from 'react-hot-toast'
import useGetProductDetails from '../../../hooks/use-get-product-details'
import useMakePayment from '../../../hooks/use-make-payment'
import { Button } from '../../components/button'
import { getFutureDateBySeconds, getRecurringInterval } from '../../../utils/dates'
import { mistToSui } from '../../../utils/sui'

const ConfirmationPage = ({ productId, refId }: { productId: string; refId: string }) => {
  const { data } = useGetProductDetails(productId)
  const makePaymentMutation = useMakePayment()

  const handleMakePayment = async () => {
    try {
      const res = await makePaymentMutation.mutateAsync({
        productId,
        productOwnerScwAddress: data?.product.merchant.wallet ?? '',
        refId,
        productSubscribersRegistry: data?.product.subscribersRegistry ?? '',
      })
      console.log(res)
      toast.success('Payment made successfully')
    } catch (error) {
      console.log(error)
      toast.error('Error making payment')
    }
  }

  const nextPaymentDate = data?.product.recurringPeriod
    ? getFutureDateBySeconds(data?.product.recurringPeriod)
    : null

  return (
    <div className="w-[360px] flex flex-col justify-between h-[100vh] p-5">
      <div className="flex flex-col gap-2">
        {/* Logos */}
        <div className="relative h-[70px] w-[70px]">
          <div className="absolute inset-0 object-center bg-purple-800/50 rounded-full border-white/50 border-3" />
          <div className="absolute inset-0 object-center bg-amber-700 rounded-full border-white/50 border-3 transform translate-x-1/2" />
        </div>
        <div className="flex flex-col">
          <p className="font-medium text-3xl">{data?.product.merchant.businessName}</p>
          <p className="text-[#7E7AF2] text-lg">Wants to make a transaction</p>
        </div>
      </div>
      <div className="rounded-xl border border-[#7E7AF2]">
        <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
          <p>Product Name</p>
          <p>{data?.product.name}</p>
        </div>
        <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
          <p>Recurrance</p>
          <p className="capitalize">
            {data?.product.productType?.toLowerCase() === 'subscription' && nextPaymentDate
              ? getRecurringInterval(new Date(nextPaymentDate))
              : 'One Time'}
          </p>
        </div>
        {nextPaymentDate && (
          <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
            <p>Next Payment</p>
            <p>{nextPaymentDate?.toDateString()}</p>
          </div>
        )}
        <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
          <p>Amount</p>
          <p>{mistToSui(data?.product.price ? +data?.product.price : 0)} SUI</p>
        </div>
        <div className="flex justify-between p-4 border-b border-[#1C1140] last-of-type:border-transparent font-medium">
          <p>Gas</p>
          <p>0.002 SUI (Approx.) </p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="secondary" className="flex-1">
          Cancel
        </Button>
        <Button variant="primary" className="flex-1" onClick={handleMakePayment}>
          {makePaymentMutation.isPending ? 'Confirming...' : 'Confirm'}
        </Button>
      </div>
    </div>
  )
}

export default ConfirmationPage
