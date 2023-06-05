import { BigDecimal,BigInt } from "@graphprotocol/graph-ts";
import { IDOPool, TokensDebt, UserInfo } from "../generated/schema";
import {
    TokensDebt as TokensDebtEvent,
    TokensWithdrawn as TokensWithdrawnEvent
  } from "../generated/templates/IDOPool/IDOPool"
export function handleTokensDebt(event: TokensDebtEvent){

  // Load the corresponding IDOPool entity
  let idoPool = IDOPool.load(event.address.toHex());
  if (idoPool !== null) {
    // Create a new UserInfo entity if it doesn't exist
    let userInfo = new UserInfo(event.params.holder.toHex());
    userInfo.debt = userInfo.debt.plus(event.params.tokenAmount);
    userInfo.total = userInfo.total.plus(event.params.tokenAmount);
    userInfo.totalInvestedETH = userInfo.totalInvestedETH.plus(event.params.ethAmount);
    userInfo.IDOPool = idoPool.id;

    idoPool.totalInvestedETH = idoPool.totalInvestedETH.plus(event.params.ethAmount)
    idoPool.tokensForDistribution = idoPool.tokensForDistribution.plus(event.params.tokenAmount)

    userInfo.save();
    idoPool.save()
    }
}  
export function handleTokensWithdrawn(event: TokensWithdrawnEvent): void {
    let idoPool = IDOPool.load(event.address.toHex());
    if (idoPool !== null) {
      // Create a new UserInfo entity if it doesn't exist
      let userInfo = new UserInfo( event.params.holder.toHex());
      userInfo.debt = BigInt.fromI32(0)
      idoPool.distributedTokens = idoPool.distributedTokens.plus( event.params.amount)

      userInfo.save();
      idoPool.save();
    }
  }