import { ethereum } from "@graphprotocol/graph-ts";
import {
  BurnPercentUpdated as BurnPercentUpdatedEvent,
  FeeAmountUpdated as FeeAmountUpdatedEvent,
  FeeWalletUpdated as FeeWalletUpdatedEvent,
  IDOCreated as IDOCreatedEvent,
  TokenFeeUpdated as TokenFeeUpdatedEvent
} from "../generated/IDOFactory/IDOFactory"
import {
  DEXInfo,
  FinInfo,
  IDOCreated, IDOFactory, IDOPool, Timestamps
} from "../generated/schema"
import { IDOPool as IDOPoolTemplate } from "../generated/templates";

import { IDO_FACTORY_ADDRESS, fetchBurnPercent, fetchDexInfo, fetchDistributed, fetchDistributedTokens, fetchFeeAmount, fetchFeeToken, fetchFeeWallet, fetchFinInfo, fetchLockerFactory, fetchMetadataURL, fetchOwner, fetchRewardToken, fetchTimestamps, fetchTokensForDistribution, fetchTotalInvestedETH } from "./helper";


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
  idofactory.feeToken = fetchFeeToken(event.address)
  idofactory.feeAmount = fetchFeeAmount(event.address)
  idofactory.burnPercent = fetchBurnPercent(event.address)
  idofactory.save();
}

export function handleIDOCreated(event: IDOCreatedEvent): void {
  let idocreated = new IDOCreated(event.transaction.hash.toHex());
  idocreated.id = event.transaction.hash.toHex()
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

  let idoPool = IDOPool.load(event.params.idoPool.toHex())
  if (idoPool == null) {
    IDOPoolTemplate.create(event.params.idoPool)
    idoPool = new IDOPool(event.params.idoPool.toHex())
    idoPool.id = event.params.idoPool.toHex()
    idoPool.rewardToken = fetchRewardToken(event.params.idoPool)
    idoPool.metadataURL = fetchMetadataURL(event.params.idoPool)
    idoPool.owner = fetchOwner(event.params.idoPool)

    let finInfoResult = fetchFinInfo(event.params.idoPool)
    let finInfo = new FinInfo(event.params.idoPool.toHex())
    finInfo.id = event.params.idoPool.toHex()
    finInfo.tokenPrice = finInfoResult.getTokenPrice()
    finInfo.softCap = finInfoResult.getSoftCap()
    finInfo.hardCap = finInfoResult.getHardCap()
    finInfo.minEthPayment = finInfoResult.getMinEthPayment()
    finInfo.maxEthPayment = finInfoResult.getMaxEthPayment()
    finInfo.listingPrice = finInfoResult.getListingPrice()
    finInfo.lpInterestRate = finInfoResult.getLpInterestRate()
    finInfo.IDOPool = idoPool.id

    let timestampResult = fetchTimestamps(event.params.idoPool)
    let timestamp = new Timestamps(event.params.idoPool.toHex())
    timestamp.id = event.params.idoPool.toHex()
    timestamp.startTimestamp = timestampResult.getStartTimestamp()
    timestamp.endTimestamp = timestampResult.getEndTimestamp()
    timestamp.unlockTimestamp = timestampResult.getUnlockTimestamp()
    timestamp.IDOPool = idoPool.id

    let dexInfoResult = fetchDexInfo(event.params.idoPool)
    let dexInfo = new DEXInfo(event.params.idoPool.toHex())
    dexInfo.id = event.params.idoPool.toHex()
    dexInfo.router = dexInfoResult.getRouter()
    dexInfo.factory = dexInfoResult.getFactory()
    dexInfo.weth = dexInfoResult.getWeth()
    dexInfo.IDOPool = idoPool.id

    idoPool.finInfo = finInfo.id
    idoPool.timestamps = timestamp.id
    idoPool.dexInfo = dexInfo.id
    idoPool.lockerFactory = fetchLockerFactory(event.params.idoPool)
    idoPool.totalInvestedETH = fetchTotalInvestedETH(event.params.idoPool)
    idoPool.tokensForDistribution = fetchTokensForDistribution(event.params.idoPool)
    idoPool.distributedTokens = fetchDistributedTokens(event.params.idoPool)
    idoPool.distributed = fetchDistributed(event.params.idoPool)

    finInfo.save()
    dexInfo.save()
    timestamp.save()
  }


  // Save the entities
  idoPool.save()
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

