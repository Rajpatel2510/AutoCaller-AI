from dotenv import load_dotenv
import logging
import json

from livekit.agents import (
    AgentServer,
    AgentSession,
    Agent,
    JobContext,
    cli,
    WorkerOptions,
    function_tool
)

from livekit.agents.beta import EndCallTool
from livekit.plugins import silero
from livekit.plugins.sarvam import STT, TTS, LLM
from prompt import PROMPT
import os
from functions import capture_lead



load_dotenv(".env")
api_key=os.getenv("SARVAM_API_KEY")
agent_name = os.getenv("AutoCaller_AI")

logging.basicConfig(level=logging.INFO)
print("Sarvam key loaded:", bool(api_key))


class Assistant(Agent):
    def __init__(self):
        super().__init__(
            instructions=PROMPT,
            tools=[EndCallTool(),capture_lead],
        )

    # async def on_enter(self):
    #     await self.session.say("નમસ્તે, કેમ છો? હું તમારી help માટે અહીં છું.")


server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: JobContext):
    print("Agent started")
    print("Room : ",ctx.room.name)

    # raw = ctx.job.metadata
    # data = json.loads(raw)

    # name = data["name"]

    session = AgentSession(
    vad=silero.VAD.load(),
    stt=STT(
        api_key=api_key,
        language="gu-IN",
        model="saaras:v3",
        mode="codemix"
    ),
    llm=LLM(
        api_key=api_key,
        # model="sarvam-30b"
        # model="sarvam-m"
        model="sarvam-105b"
    ),
    tts=TTS(
        api_key=api_key,
        target_language_code="gu-IN",
        model="bulbul:v3",
        speaker="rahul"
    )
)

    await session.start(
        room=ctx.room,
        agent=Assistant(),
    )

if __name__ == "__main__":
    cli.run_app(
        WorkerOptions(
            entrypoint_fnc=my_agent
        )
    )