import { Address, BigInt } from "@graphprotocol/graph-ts";
import { IDOFactory as IDOFactoryContract } from "../generated/IDOFactory/IDOFactory";
import { IDOPool as IDOPoolContract, IDOPool__dexInfoResult, IDOPool__finInfoResult, IDOPool__timestampsResult } from "../generated/templates/IDOPool/IDOPool";
export const IDO_FACTORY_ADDRESS = "0x304ec7dda1d83e65d53770cf0a8ba6626efbaf5f";
export function fetchFeeToken(tokenAddress: Address) : Address{
    let contract = IDOFactoryContract.bind(tokenAddress);
	let feeTokenResult = contract.try_feeToken();

	return feeTokenResult.value;
}

export function fetchFeeAmount(tokenAddress: Address) : BigInt{
    let contract = IDOFactoryContract.bind(tokenAddress);
	let feeAmountResult = contract.try_feeAmount();

	return feeAmountResult.value;
}
export function fetchBurnPercent(tokenAddress: Address) : BigInt{
    let contract = IDOFactoryContract.bind(tokenAddress);
	let burnPercentResult = contract.try_burnPercent();

	return burnPercentResult.value;
}
export function fetchFeeWallet(tokenAddress: Address) : Address{
    let contract = IDOFactoryContract.bind(tokenAddress);
	let feeWalletResult = contract.try_feeWallet();

	return feeWalletResult.value;
}
export function fetchRewardToken(tokenAddress:Address): Address{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let rewardTokenResult = idoPoolContract.try_rewardToken()
	return rewardTokenResult.value
}
export function fetchUnsoldToken(tokenAddress:Address): BigInt{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let unsoldTokenResult = idoPoolContract.try_getNotSoldToken()
	return unsoldTokenResult.value
}
export function fetchMetadataURL(tokenAddress:Address): string{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let metadataURLResult = idoPoolContract.try_metadataURL()
	return metadataURLResult.value
}
export function fetchOwner(tokenAddress:Address): Address{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let ownerResult = idoPoolContract.try_owner()
	return ownerResult.value
}
export function fetchFinInfo(tokenAddress:Address): IDOPool__finInfoResult{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let finInfoResult = idoPoolContract.try_finInfo()
	return finInfoResult.value
}
export function fetchTimestamps(tokenAddress:Address): IDOPool__timestampsResult{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let timestampsResult = idoPoolContract.try_timestamps()
	return timestampsResult.value
}

export function fetchDexInfo(tokenAddress:Address): IDOPool__dexInfoResult{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let dexInfoResult = idoPoolContract.try_dexInfo()
	return dexInfoResult.value
}
export function fetchLockerFactory(tokenAddress:Address): Address{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let lockerFactoryResult = idoPoolContract.try_lockerFactory()
	return lockerFactoryResult.value
}
export function fetchTotalInvestedETH(tokenAddress:Address): BigInt{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let totalInvestedETHResult = idoPoolContract.try_totalInvestedETH()
	return totalInvestedETHResult.value
}
export function fetchTokensForDistribution(tokenAddress:Address): BigInt{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let tokensForDistributionResult = idoPoolContract.try_tokensForDistribution()
	return tokensForDistributionResult.value
}
export function fetchDistributedTokens(tokenAddress:Address): BigInt{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let distributedTokensResult = idoPoolContract.try_distributedTokens()
	return distributedTokensResult.value
}
export function fetchDistributed(tokenAddress:Address): boolean{
	let idoPoolContract = IDOPoolContract.bind(tokenAddress)
	let distributedResult = idoPoolContract.try_distributed()
	return distributedResult.value
}