import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt, Address } from "@graphprotocol/graph-ts"
import {
  BurnPercentUpdated,
  FeeAmountUpdated,
  FeeWalletUpdated,
  IDOCreated,
  OwnershipTransferred,
  TokenFeeUpdated
} from "../generated/IDOFactory/IDOFactory"

export function createBurnPercentUpdatedEvent(
  newBurnPercent: BigInt,
  divider: BigInt
): BurnPercentUpdated {
  let burnPercentUpdatedEvent = changetype<BurnPercentUpdated>(newMockEvent())

  burnPercentUpdatedEvent.parameters = new Array()

  burnPercentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newBurnPercent",
      ethereum.Value.fromUnsignedBigInt(newBurnPercent)
    )
  )
  burnPercentUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "divider",
      ethereum.Value.fromUnsignedBigInt(divider)
    )
  )

  return burnPercentUpdatedEvent
}

export function createFeeAmountUpdatedEvent(
  newFeeAmount: BigInt
): FeeAmountUpdated {
  let feeAmountUpdatedEvent = changetype<FeeAmountUpdated>(newMockEvent())

  feeAmountUpdatedEvent.parameters = new Array()

  feeAmountUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeAmount",
      ethereum.Value.fromUnsignedBigInt(newFeeAmount)
    )
  )

  return feeAmountUpdatedEvent
}

export function createFeeWalletUpdatedEvent(
  newFeeWallet: Address
): FeeWalletUpdated {
  let feeWalletUpdatedEvent = changetype<FeeWalletUpdated>(newMockEvent())

  feeWalletUpdatedEvent.parameters = new Array()

  feeWalletUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeWallet",
      ethereum.Value.fromAddress(newFeeWallet)
    )
  )

  return feeWalletUpdatedEvent
}

export function createIDOCreatedEvent(
  owner: Address,
  idoPool: Address,
  rewardToken: Address,
  tokenURI: string
): IDOCreated {
  let idoCreatedEvent = changetype<IDOCreated>(newMockEvent())

  idoCreatedEvent.parameters = new Array()

  idoCreatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  idoCreatedEvent.parameters.push(
    new ethereum.EventParam("idoPool", ethereum.Value.fromAddress(idoPool))
  )
  idoCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "rewardToken",
      ethereum.Value.fromAddress(rewardToken)
    )
  )
  idoCreatedEvent.parameters.push(
    new ethereum.EventParam("tokenURI", ethereum.Value.fromString(tokenURI))
  )

  return idoCreatedEvent
}

export function createOwnershipTransferredEvent(
  previousOwner: Address,
  newOwner: Address
): OwnershipTransferred {
  let ownershipTransferredEvent = changetype<OwnershipTransferred>(
    newMockEvent()
  )

  ownershipTransferredEvent.parameters = new Array()

  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  ownershipTransferredEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return ownershipTransferredEvent
}

export function createTokenFeeUpdatedEvent(
  newFeeToken: Address
): TokenFeeUpdated {
  let tokenFeeUpdatedEvent = changetype<TokenFeeUpdated>(newMockEvent())

  tokenFeeUpdatedEvent.parameters = new Array()

  tokenFeeUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "newFeeToken",
      ethereum.Value.fromAddress(newFeeToken)
    )
  )

  return tokenFeeUpdatedEvent
}
