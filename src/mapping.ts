import { BigDecimal, BigInt } from "@graphprotocol/graph-ts";
import { IDOPool, UserInfo } from "../generated/schema";
import {

  RefundUser as RefundUserEvent,
  TokensDebt as TokensDebtEvent,
  TokensWithdrawn as TokensWithdrawnEvent,
  WithdrawETH as WithdrawETHEvent,
  WithdrawNotSoldToken as WithdrawNotSoldTokenEvent
} from "../generated/templates/IDOPool/IDOPool"
import { fetchUnsoldToken } from "./helper";
export function handleTokensDebt(event: TokensDebtEvent): void {

  // Load the corresponding IDOPool entity
  let idoPool = IDOPool.load(event.address.toHex());
  if (idoPool !== null) {
    // Create a new UserInfo entity if it doesn't exist
    let userInfo = UserInfo.load(event.params.holder.toHex() + "-" + event.address.toHex())
    if(userInfo == null){
      userInfo = new UserInfo(event.params.holder.toHex() + "-" + event.address.toHex());
      userInfo.debt =  event.params.tokenAmount;
      userInfo.total = event.params.tokenAmount;
      userInfo.totalInvestedETH = event.params.ethAmount;
      userInfo.IDOPool = idoPool.id;
      userInfo.save();
    } else{
      userInfo.debt =  userInfo.debt.plus(event.params.tokenAmount);
      userInfo.total = userInfo.total.plus(event.params.tokenAmount);
      userInfo.totalInvestedETH = userInfo.totalInvestedETH.plus(event.params.ethAmount);
      userInfo.save();      
    }
    idoPool.totalInvestedETH = idoPool.totalInvestedETH.plus(event.params.ethAmount)
    idoPool.tokensForDistribution = idoPool.tokensForDistribution.plus(event.params.tokenAmount)
    idoPool.unsold = fetchUnsoldToken(event.address)
    idoPool.save()
  }
}
export function handleTokensWithdrawn(event: TokensWithdrawnEvent): void {
  let idoPool = IDOPool.load(event.address.toHex());
  if (idoPool !== null) {
    let userInfo = UserInfo.load(event.params.holder.toHex() + "-" + event.address.toHex())
    if(userInfo !==null){
      userInfo.debt = BigInt.fromI32(0)
      userInfo.save();
    }
   
    idoPool.distributedTokens = idoPool.distributedTokens.plus(event.params.amount)
    idoPool.unsold = fetchUnsoldToken(event.address)

   
    idoPool.save();
  }
}
export function handleWithdrawNotSoldToken(event: WithdrawNotSoldTokenEvent): void{
  let idoPool = IDOPool.load(event.address.toHex());
  if(idoPool !== null){
    idoPool.unsold = BigInt.fromI32(0)
    idoPool.save()
  }
}
export function handleRefund(event: RefundUserEvent): void{
  let userInfo = UserInfo.load(event.params.user.toHex() + "-" + event.address.toHex())
  if(userInfo !== null){
    userInfo.debt = BigInt.fromI32(0)
    userInfo.totalInvestedETH = BigInt.fromI32(0)
    userInfo.total = BigInt.fromI32(0)
    userInfo.save()
  }
}
export function handleWithdrawETH (event: WithdrawETHEvent): void{
  let idoPool = IDOPool.load(event.address.toHex())
  if(idoPool !== null){
    idoPool.distributed = true
    idoPool.save()
  }
}