import { motion } from 'framer-motion';

const SNIPPETS = [
  'def build_agent():',
  'model.fit(X, y)',
  'import torch.nn as nn',
  'async def infer(req):',
  'return {"status":"ok"}',
  'class NeuralNet(nn.Module):',
  'aws s3 sync ./data',
  'kubectl apply -f k8s/',
  'pip install langflow',
  'tf.keras.Sequential()',
  'client.vector_search()',
  'await mcp.call_tool()',
  'loss = cross_entropy()',
  'optimizer.step()',
  'app = Flask(__name__)',
  'react.useState()',
];

export default function FloatingCode() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
      {SNIPPETS.map((s, i) => {
        const left = (i * 37) % 90 + 3;
        const delay = (i * 1.3) % 8;
        const duration = 14 + (i % 6) * 3;
        return (
          <motion.div
            key={i}
            className="absolute font-mono text-[11px] text-cyber-neon/30 whitespace-nowrap"
            style={{ left: `${left}%` }}
            initial={{ y: '110vh', opacity: 0 }}
            animate={{ y: '-20vh', opacity: [0, 0.6, 0.6, 0] }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            {s}
          </motion.div>
        );
      })}
    </div>
  );
}
