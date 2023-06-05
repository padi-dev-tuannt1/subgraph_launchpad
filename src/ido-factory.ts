import {
  BurnPercentUpdated as BurnPercentUpdatedEvent,
  FeeAmountUpdated as FeeAmountUpdatedEvent,
  FeeWalletUpdated as FeeWalletUpdatedEvent,
  IDOCreated as IDOCreatedEvent,
  TokenFeeUpdated as TokenFeeUpdatedEvent
} from "../generated/IDOFactory/IDOFactory"
import {
  IDOCreated,IDOFactory
} from "../generated/schema"
import { IDO_FACTORY_ADDRESS } from "./helper";


export function handleBurnPercentUpdated(event: BurnPercentUpdatedEvent): void {
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }
  idofactory.burnPercent = event.params.newBurnPercent;
  idofactory.divider = event.params.divider

  idofactory.save();
}

export function handleFeeAmountUpdated(event: FeeAmountUpdatedEvent): void {
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }
  idofactory.feeAmount = event.params.newFeeAmount;
  idofactory.save();
}

export function handleFeeWalletUpdated(event: FeeWalletUpdatedEvent): void {
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }
  idofactory.feeWallet = event.params.newFeeWallet;
  idofactory.save();
}

export function handleIDOCreated(event: IDOCreatedEvent): void {
  let idocreated = new IDOCreated(event.transaction.hash.toHex());
  idocreated.owner = event.params.owner;
  idocreated.idoPool = event.params.idoPool;
  idocreated.rewardToken = event.params.rewardToken;
  idocreated.tokenURI = event.params.tokenURI;
  idocreated.createdAt = event.block.timestamp;
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }

  idocreated.IDOFactory = idofactory.id;
  // Save the entities
  idocreated.save();
  idofactory.save();
}


export function handleTokenFeeUpdated(event: TokenFeeUpdatedEvent): void {
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }
  idofactory.feeToken = event.params.newFeeToken;

  idofactory.save();
}
