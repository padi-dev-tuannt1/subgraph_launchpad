import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt, Address } from "@graphprotocol/graph-ts"
import { BurnPercentUpdated } from "../generated/schema"
import { BurnPercentUpdated as BurnPercentUpdatedEvent } from "../generated/IDOFactory/IDOFactory"
import { handleBurnPercentUpdated } from "../src/ido-factory"
import { createBurnPercentUpdatedEvent } from "./ido-factory-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let newBurnPercent = BigInt.fromI32(234)
    let divider = BigInt.fromI32(234)
    let newBurnPercentUpdatedEvent = createBurnPercentUpdatedEvent(
      newBurnPercent,
      divider
    )
    handleBurnPercentUpdated(newBurnPercentUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("BurnPercentUpdated created and stored", () => {
    assert.entityCount("BurnPercentUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "BurnPercentUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "newBurnPercent",
      "234"
    )
    assert.fieldEquals(
      "BurnPercentUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "divider",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
