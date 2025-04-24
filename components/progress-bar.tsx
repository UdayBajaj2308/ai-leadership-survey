export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
      <div
        className="h-2.5 rounded-full gradient-bg"
        style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
      />
    </div>
  )
}
