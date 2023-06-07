import { Address, BigInt } from "@graphprotocol/graph-ts";
import { IDOFactory as IDOFactoryContract } from "../generated/IDOFactory/IDOFactory";
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