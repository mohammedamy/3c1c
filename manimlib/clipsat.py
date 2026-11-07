"""
ClipSAT extensions for 3c1c (ManimGL).

Provides ClipSATScene, theme tokens (Paper #FAF7F2 & Dark Slate #0A0D14,
Indigo & Amber mathematical colormaps), watermark helpers, and curriculum
header badges matching clipsat.org.
"""
from __future__ import annotations

from dataclasses import dataclass
from typing import Literal

from manimlib.config import manim_config
from manimlib.constants import (
    CLIPSAT_AMBER_A,
    CLIPSAT_AMBER_B,
    CLIPSAT_AMBER_C,
    CLIPSAT_AMBER_D,
    CLIPSAT_DARK,
    CLIPSAT_INDIGO_A,
    CLIPSAT_INDIGO_B,
    CLIPSAT_INDIGO_C,
    CLIPSAT_INDIGO_D,
    CLIPSAT_INK,
    CLIPSAT_OK,
    CLIPSAT_OK_BRIGHT,
    CLIPSAT_PANEL,
    CLIPSAT_PAPER,
    CLIPSAT_PAPER_2,
    CLIPSAT_ROSE,
    CLIPSAT_TEAL,
    CLIPSAT_TEAL_BRIGHT,
    DL,
    DR,
    LEFT,
    MED_SMALL_BUFF,
    RIGHT,
    SMALL_BUFF,
    UL,
)
from manimlib.mobject.geometry import Dot, Line
from manimlib.mobject.shape_matchers import SurroundingRectangle
from manimlib.mobject.svg.text_mobject import Text
from manimlib.mobject.types.vectorized_mobject import VGroup
from manimlib.scene.scene import Scene

ThemeMode = Literal["dark", "paper"]


@dataclass(frozen=True)
class ClipSATTheme:
    """Resolved color tokens for a ClipSAT 3c1c scene."""

    mode: ThemeMode
    background: str
    surface: str
    ink: str
    muted: str
    grid: str
    indigo: str
    indigo_accent: str
    amber: str
    amber_accent: str
    teal: str
    ok: str
    rose: str


CLIPSAT_THEMES: dict[ThemeMode, ClipSATTheme] = {
    "dark": ClipSATTheme(
        mode="dark",
        background=CLIPSAT_DARK,
        surface=CLIPSAT_PANEL,
        ink="#EEF2F6",
        muted="#94A3B8",
        grid="#1C2436",
        indigo=CLIPSAT_INDIGO_B,
        indigo_accent=CLIPSAT_INDIGO_A,
        amber=CLIPSAT_AMBER_B,
        amber_accent=CLIPSAT_AMBER_A,
        teal=CLIPSAT_TEAL_BRIGHT,
        ok=CLIPSAT_OK_BRIGHT,
        rose=CLIPSAT_ROSE,
    ),
    "paper": ClipSATTheme(
        mode="paper",
        background=CLIPSAT_PAPER,
        surface=CLIPSAT_PAPER_2,
        ink=CLIPSAT_INK,
        muted="#4B5668",
        grid="#DFD7CB",
        indigo=CLIPSAT_INDIGO_D,
        indigo_accent=CLIPSAT_INDIGO_C,
        amber=CLIPSAT_AMBER_D,
        amber_accent=CLIPSAT_AMBER_C,
        teal=CLIPSAT_TEAL,
        ok=CLIPSAT_OK,
        rose=CLIPSAT_ROSE,
    ),
}


def get_clipsat_theme(mode: ThemeMode | None = None) -> ClipSATTheme:
    """Return the active ClipSAT palette ('dark' or 'paper')."""
    if mode is None:
        cfg_mode = getattr(getattr(manim_config, "clipsat", None), "theme", "dark")
        mode = "paper" if cfg_mode == "paper" else "dark"
    return CLIPSAT_THEMES.get(mode, CLIPSAT_THEMES["dark"])


class ClipSATScene(Scene):
    """
    Base Scene tailored for ClipSAT mathematical explainers and exam clips.

    Conventions matching clipsat.org:
    - Indigo represents primary curves, derivatives, and tangent structures.
    - Amber represents integrals, areas, secants, and highlighted exam steps.
    - Supports both Dark Slate (#0A0D14) and Editorial Paper (#FAF7F2) themes.
    """

    clipsat_mode: ThemeMode | None = None
    clipsat_track: str = "ClipSAT Mathematics"
    clipsat_watermark: bool = True

    def setup(self) -> None:
        super().setup()
        self.theme = get_clipsat_theme(self.clipsat_mode)
        self.camera.background_rgba[:3] = self._hex_to_rgb01(self.theme.background)
        if self.clipsat_watermark:
            self.watermark_mob = self.build_clipsat_watermark()
            self.add(self.watermark_mob)

    @staticmethod
    def _hex_to_rgb01(hex_color: str) -> tuple[float, float, float]:
        h = hex_color.lstrip("#")
        return (int(h[0:2], 16) / 255.0, int(h[2:4], 16) / 255.0, int(h[4:6], 16) / 255.0)

    def build_clipsat_watermark(self, text: str | None = None) -> VGroup:
        label_str = text or getattr(
            getattr(manim_config, "clipsat", None),
            "watermark_text",
            "ClipSAT · 3c1c",
        )
        dot_indigo = Dot(radius=0.045, color=self.theme.indigo)
        dot_amber = Dot(radius=0.045, color=self.theme.amber).next_to(
            dot_indigo, RIGHT, buff=0.05
        )
        wordmark = Text(label_str, font_size=18, color=self.theme.muted)
        wordmark.next_to(dot_amber, RIGHT, buff=0.1)
        group = VGroup(dot_indigo, dot_amber, wordmark)
        group.set_opacity(0.82)
        group.to_corner(DR, buff=MED_SMALL_BUFF)
        group.fix_in_frame()
        return group

    def build_exam_header(self, track: str, title: str) -> VGroup:
        """Create a clean editorial ClipSAT track & topic header."""
        track_mob = Text(track.upper(), font_size=16, color=self.theme.amber)
        title_mob = Text(title, font_size=30, color=self.theme.ink)
        title_mob.next_to(track_mob, RIGHT, buff=0.28)
        underline = Line(
            LEFT * 0.1,
            RIGHT * (track_mob.get_width() + title_mob.get_width() + 0.4),
            stroke_width=1.5,
            color=self.theme.grid,
        )
        header = VGroup(track_mob, title_mob)
        underline.next_to(header, DL, buff=0.1).align_to(header, LEFT)
        full = VGroup(header, underline)
        full.to_corner(UL, buff=MED_SMALL_BUFF)
        full.fix_in_frame()
        return full

    def highlight_callout(self, mobject, color: str | None = None) -> SurroundingRectangle:
        """Frame a key formula or exam result in ClipSAT Amber/Indigo."""
        stroke = color or self.theme.amber
        box = SurroundingRectangle(
            mobject,
            buff=SMALL_BUFF * 1.6,
            color=stroke,
            stroke_width=2.5,
        )
        box.set_fill(stroke, opacity=0.08)
        return box


__all__ = [
    "ClipSATTheme",
    "CLIPSAT_THEMES",
    "ClipSATScene",
    "get_clipsat_theme",
]
