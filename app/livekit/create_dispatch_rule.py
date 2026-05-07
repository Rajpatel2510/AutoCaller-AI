import asyncio
from livekit import api
import os
from dotenv import load_dotenv


load_dotenv()


async def main():
    lkapi = api.LiveKitAPI()

    rule = api.SIPDispatchRule(
        dispatch_rule_individual=api.SIPDispatchRuleIndividual(
            room_prefix="call-"
        )
    )

    request = api.CreateSIPDispatchRuleRequest(
        dispatch_rule=api.SIPDispatchRuleInfo(
            rule=rule,
            name="my_dispatch_rule",
            trunk_ids=[os.getenv("SIP_OUTBOUND_TRUNK_ID")],
            room_config=api.RoomConfiguration(
                agents=[
                    api.RoomAgentDispatch(
                        agent_name="outbound_agent",
                        metadata="job dispatch metadata"
                    )
                ]
            )
        )
    )

    dispatch = await lkapi.sip.create_sip_dispatch_rule(request)

    print("Created dispatch:", dispatch)

    await lkapi.aclose()

asyncio.run(main())