import asyncio
import os
import logging
from dotenv import load_dotenv
from livekit import api
import json



load_dotenv(".env")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("make-call")

agent_name = "AutoCaller_AI"
outbound_trunk_id = os.getenv("SIP_OUTBOUND_TRUNK_ID")


async def make_call(phone_number,name):
    clean_number = ''.join(filter(str.isdigit, phone_number))
    room_name = f"call-{clean_number}"
    


    print("Name : ",name)
    print("Phone number : ",phone_number)
    metadata = json.dumps({
                    "name": name,
                    "phone_number": phone_number,
                })
    print("Metadata : ",metadata)

    lkapi = api.LiveKitAPI(
        url=os.getenv("LIVEKIT_URL"),
        api_key=os.getenv("LIVEKIT_API_KEY"),
        api_secret=os.getenv("LIVEKIT_API_SECRET"),
    )   

    try:
        logger.info(f"Creating dispatch in room {room_name}")

        await lkapi.agent_dispatch.create_dispatch(
            api.CreateAgentDispatchRequest(
                agent_name=agent_name,
                room=room_name,
                metadata=metadata
            )
        )

        logger.info(f"Calling {phone_number}")

        await lkapi.sip.create_sip_participant(
            api.CreateSIPParticipantRequest(
                room_name=room_name,
                sip_trunk_id=outbound_trunk_id,
                sip_call_to=phone_number,
                participant_identity="phone_user",
                wait_until_answered=True,
            )
        )

        logger.info("Call answered successfully")

    except Exception as e:
        logger.error(f"Call failed: {e}")

    finally:
        await lkapi.aclose()


async def main():
    phone_numbers = ["+917990801974"]

    tasks = [make_call(number) for number in phone_numbers]
    await asyncio.gather(*tasks)


if __name__ == "__main__":
    asyncio.run(main())







