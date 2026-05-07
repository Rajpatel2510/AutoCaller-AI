from fastapi import APIRouter
from app.api.schema.outbound_schema import OutboundCallRequest

router = APIRouter(prefix="/call", tags=["call"])

@router.post("make_call")
async def make_call(payload: OutboundCallRequest):
    pass