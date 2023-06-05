import {
  BurnPercentUpdated as BurnPercentUpdatedEvent,
  FeeAmountUpdated as FeeAmountUpdatedEvent,
  FeeWalletUpdated as FeeWalletUpdatedEvent,
  IDOCreated as IDOCreatedEvent,
  OwnershipTransferred as OwnershipTransferredEvent,
  TokenFeeUpdated as TokenFeeUpdatedEvent
} from "../generated/IDOFactory/IDOFactory"
import {
  BurnPercentUpdated,
  FeeAmountUpdated,
  FeeWalletUpdated,
  IDOCreated,
  OwnershipTransferred,
  TokenFeeUpdated
} from "../generated/schema"

export function handleBurnPercentUpdated(event: BurnPercentUpdatedEvent): void {
  let entity = new BurnPercentUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newBurnPercent = event.params.newBurnPercent
  entity.divider = event.params.divider

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeAmountUpdated(event: FeeAmountUpdatedEvent): void {
  let entity = new FeeAmountUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeeAmount = event.params.newFeeAmount

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleFeeWalletUpdated(event: FeeWalletUpdatedEvent): void {
  let entity = new FeeWalletUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeeWallet = event.params.newFeeWallet

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleIDOCreated(event: IDOCreatedEvent): void {
  let entity = new IDOCreated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.idoPool = event.params.idoPool
  entity.rewardToken = event.params.rewardToken
  entity.tokenURI = event.params.tokenURI

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleOwnershipTransferred(
  event: OwnershipTransferredEvent
): void {
  let entity = new OwnershipTransferred(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokenFeeUpdated(event: TokenFeeUpdatedEvent): void {
  let entity = new TokenFeeUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newFeeToken = event.params.newFeeToken

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
