import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import ReactDOM from "react-dom";

const MobileDrawer = ({ open, onClose, children, showOverlay = true }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          {showOverlay && (
            <motion.div
              className="fixed inset-0 bg-black/40 z-[999]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
            />
          )}

          {/* Drawer */}
          <motion.div
            drag="y"
            dragElastic={0.01}
            dragConstraints={{ top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100) onClose();
            }}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-0 left-0 right-0 z-[50] bg-background rounded-t-2xl p-4 max-h-[85vh] overflow-y-auto shadow-lg"
          >
            <div className="w-16 h-1 bg-accent rounded-full mx-auto mb-4" />
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    // Render outside the map container
    document.body
  );
};

export default MobileDrawer;
