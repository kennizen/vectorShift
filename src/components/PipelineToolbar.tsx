import { DraggableNode } from "./DraggableNode";


export const PipelineToolbar = () => {
   return (
    <div style={{ padding: '10px' }}>
        <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            <DraggableNode type='node' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
        </div>
    </div>
);;
};