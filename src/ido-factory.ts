import {
  BurnPercentUpdated as BurnPercentUpdatedEvent,
  FeeAmountUpdated as FeeAmountUpdatedEvent,
  FeeWalletUpdated as FeeWalletUpdatedEvent,
  IDOCreated as IDOCreatedEvent,
  TokenFeeUpdated as TokenFeeUpdatedEvent
} from "../generated/IDOFactory/IDOFactory"
import {
  FinInfo,
  IDOCreated, IDOFactory, IDOPool
} from "../generated/schema"

import { IDO_FACTORY_ADDRESS, fetchBurnPercent, fetchDexInfo, fetchDistributed, fetchDistributedTokens, fetchFeeAmount, fetchFeeToken, fetchFeeWallet, fetchFinInfo, fetchLockerFactory, fetchMetadataURL, fetchRewardToken, fetchTimestamps, fetchTokensForDistribution, fetchTotalInvestedETH } from "./helper";


export function handleBurnPercentUpdated(event: BurnPercentUpdatedEvent): void {
  let idofactory = IDOFactory.load(event.address.toHex())
  if (idofactory == null) {
    idofactory = new IDOFactory(event.address.toHex());
    idofactory.id = event.address.toHex();
  }
  idofactory.burnPercent = event.params.newBurnPercent;

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
    idofactory.feeToken = fetchFeeToken(event.address)
    idofactory.feeAmount = fetchFeeAmount(event.address)
    idofactory.feeWallet = fetchFeeWallet(event.address)
    idofactory.burnPercent = fetchBurnPercent(event.address)
  }

  idocreated.IDOFactory = idofactory.id;
  let idoPool = IDOPool.load(event.address.toHex())
  if(idoPool == null){
    idoPool = new IDOPool(event.address.toHex())
    idoPool.id = event.address.toHex()
    idoPool.rewardToken = fetchRewardToken(event.params.idoPool)
    idoPool.metadataURL = fetchMetadataURL(event.params.idoPool)
    idoPool.finInfo = fetchFinInfo(event.params.idoPool)
    idoPool.timestamps = fetchTimestamps(event.params.idoPool)
    idoPool.dexInfo = fetchDexInfo(event.params.idoPool)
    idoPool.lockerFactory = fetchLockerFactory(event.params.idoPool)
    idoPool.totalInvestedETH = fetchTotalInvestedETH(event.params.idoPool)
    idoPool.tokensForDistribution = fetchTokensForDistribution(event.params.idoPool)
    idoPool.distributedTokens = fetchDistributedTokens(event.params.idoPool)
    idoPool.distributed = fetchDistributed(event.params.idoPool)
  }
  
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
